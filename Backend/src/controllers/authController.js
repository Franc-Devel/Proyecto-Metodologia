import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, vehicleModel } = req.body;

    // Validación básica para asegurarnos de que no falten datos clave
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Nombre, email y contraseña son obligatorios." });
    }

    // Llamamos al servicio para ejecutar la lógica de negocio
    const newUser = await authService.registerUser({
      name,
      email,
      password,
      phone,
      vehicleModel,
    });

    // Devolvemos un 201 (Created) y NO devolvemos la contraseña ni el token en la respuesta
    res.status(201).json({
      message:
        "Usuario registrado con éxito. Te hemos enviado un código de verificación.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
