import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "../repositories/userRepository.js";

export const registerUser = async (data) => {
  const { name, email, password, phone, vehicleModel } = data;

  // 1. Verificamos si el correo ya está registrado
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("El correo electrónico ya se encuentra registrado.");
  }

  // 2. Encriptamos la contraseña (hasheo)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Generamos un código numérico aleatorio de 6 dígitos para el email
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();

  // 4. Guardamos el usuario en la base de datos
  const newUser = await createUser({
    name,
    email,
    password: hashedPassword, // ¡Guardamos el hash, no la contraseña real!
    phone,
    vehicleModel,
    verificationToken,
  });

  // TODO: Acá llamaremos a nodemailer para enviar el correo
  // await sendVerificationEmail(newUser.email, verificationToken);

  return newUser;
};
