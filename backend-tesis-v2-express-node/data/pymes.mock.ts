import { PymesArray } from '../schemas/pymes';

export const mockPymes: PymesArray = [
  {
    "id": 1,
    "name": "Panadería La Especial",
    "type": "proveedor",
    "category": "alimentos",
    "location": "Bogotá",
    "services": [
      "Panadería artesanal",
      "Pastelería",
      "Catering para eventos"
    ],
    "fundation": 2015,
    "employee": 8,
    "phone": "+57 310 123 4567",
    "email": "contacto@panaderialaespecial.com",
    "socialNetwork": {
      "facebook": "PanaderiaLaEspecial",
      "instagram": "@panaderia_especial"
    },
    "qualification": 4.7
  },
  {
    "id": 2,
    "name": "Diseños Creativos SAS",
    "type": "proveedor",
    "category": "diseño",
    "location": "Medellín",
    "services": [
      "Diseño gráfico",
      "Branding",
      "Diseño web"
    ],
    "fundation": 2018,
    "employee": 5,
    "phone": "+57 320 987 6543",
    "email": "info@disenoscreativos.com",
    "socialNetwork": {
      "facebook": "DisenosCreativosSAS",
      "instagram": "@disenos_creativos"
    },
    "qualification": 4.9
  },
  {
    "id": 3,
    "name": "Limpieza Express",
    "type": "proveedor",
    "category": "services",
    "location": "Cali",
    "services": [
      "Limpieza residencial",
      "Limpieza comercial",
      "Limpieza post-construcción"
    ],
    "fundation": 2020,
    "employee": 12,
    "phone": "+57 315 456 7890",
    "email": "servicio@limpiezaexpress.com",
    "socialNetwork": {
      "facebook": "LimpiezaExpressCol",
      "instagram": "@limpieza_express"
    },
    "qualification": 4.5
  },
  {
    "id": 4,
    "name": "Restaurante Sabores del Valle",
    "type": "comprador",
    "category": "restaurante",
    "location": "Pereira",
    "needs": [
      "Proveedores de alimentos orgánicos",
      "services de limpieza profesional",
      "Diseño de menú digital"
    ],
    "fundation": 2019,
    "employee": 15,
    "phone": "+57 300 123 9876",
    "email": "contacto@saboresdelvalle.com",
    "socialNetwork": {
      "facebook": "SaboresDelValle",
      "instagram": "@sabores_valle"
    },
    "qualification": 4.8
  },
  {
    "id": 5,
    "name": "TechSolutions",
    "type": "proveedor",
    "category": "tecnologia",
    "location": "Barranquilla",
    "services": [
      "Desarrollo de software",
      "Soporte técnico",
      "Consultoría IT"
    ],
    "fundation": 2017,
    "employee": 10,
    "phone": "+57 318 765 4321",
    "email": "soporte@techsolutions.co",
    "socialNetwork": {
      "facebook": "TechSolutionsCO",
      "instagram": "@tech_solutions_co"
    },
    "qualification": 4.6
  }
];