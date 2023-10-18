// Espacio para importar los iconos
import { MdHeadset, MdInfo, MdLensBlur } from 'react-icons/md';

const mainCards = [
    {
        icon: MdLensBlur,
        title: "Te damos la bienvenida 😊",
        description: "Acceda completamente gratis a una guía sobre nuestros productos y los beneficios que le ofrecemos por ser nuestro cliente.",
        destiny: "bienvenida"
    },
    {
        icon: MdInfo,
        title: "¿Cómo usar el aplicativo?",
        description: `Diseñamos una guía especializada para usted. Conozca las funciones y el potencial de PCC (Punto de Control de Certificaciones).`,
        destiny: 'uso-general'
    },
    {
        icon: MdHeadset,
        title: "Contacto 24/7",
        description: "Conozca nuestras líneas de contacto en caso de cualquier duda, queja o reclamo. Es un gusto brindarle la atención y el apoyo que se merece.",
        destiny: 'atencion-cliente'
    }
]

export default mainCards