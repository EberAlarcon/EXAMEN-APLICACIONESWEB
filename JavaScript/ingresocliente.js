const expresiones = {
    cedula: /^.{10,10}$/, // Letras y espacios, pueden llevar acentos.
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    direccion: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    telefono: /^.{10,10}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "cedula":
            if (expresiones.nombre.test(e.target.value)) {
                document.getElementById("n-error").innerHTML = "";
                document.getElementById("s-error").innerHTML = "";
            } else {
                document.getElementById("n-error").innerHTML =
                    "Cedula no válida";
            }
            break;           
        case "nombre":
            if (expresiones.nombre.test(e.target.value)) {
                document.getElementById("n-error").innerHTML = "";
                document.getElementById("s-error").innerHTML = "";
            } else {
                document.getElementById("n-error").innerHTML =
                    "Nombre no válido";
            }
            break;
            case "direccion":
                if (expresiones.nombre.test(e.target.value)) {
                    document.getElementById("n-error").innerHTML = "";
                    document.getElementById("s-error").innerHTML = "";
                } else {
                    document.getElementById("n-error").innerHTML =
                        "Direccion no válido";
                }
                break;
        case "telefono":
            if (expresiones.telefono.test(e.target.value)) {
                document.getElementById("t-error").innerHTML = "";
                document.getElementById("s-error").innerHTML = "";
            } else {
                document.getElementById("t-error").innerHTML =
                    "Telefono no valida";
            }
            break;
        case "correo":
            if (expresiones.correo.test(e.target.value)) {
                document.getElementById("c-error").innerHTML = "";
                document.getElementById("s-error").innerHTML = "";
            } else {
                document.getElementById("c-error").innerHTML =
                    "Correo no válido";
            }
            break;
    }
};

// En esta parte uso PL/SQL para guardar los datos

exports.register = async (req, res) => {
    try {
        const {
            cedula,
            nombre,
            direccion,
            telefono,
            correo,
        } = req.body;

        if (
            !cedula ||
            !nombre ||
            !direccion ||
            !telefono ||
            !correo 
           
        ) {
            res.render("register", {
                message: "Ingrese todos los campos",
            });
        } else {
            db.query(
                "SELECT * FROM CLIENTE WHERE nombre = ?",
                [nombre],
                async (error, results) => {
                    if (error) {
                        console.log(error);
                        db.query(
                            "INSERT INTO CLIENTE SET ?",
                            {
                                cedula: cedula,
                                nombre: nombre,
                                direccion: direccion,
                                telefono: telefono,
                                correo: correo,
                                
                            },
                            (error, results) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    return res.render("register", {
                                        message: "Cliente Ingresado",
                                    });
                                }
                            }
                        );
                    }
                }
            );
        }
    } catch (error) {
        console.log(error);
    }
};
