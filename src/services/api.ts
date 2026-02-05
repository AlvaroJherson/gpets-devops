import axios from 'axios';
import type { Pet } from '../types/Pet';

// Configurar URL base (puede ser variable de entorno)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Mock data para demostración si no hay backend corriendo
const MOCK_PETS: Pet[] = [
    {
        id: 1,
        petName: "Fido",
        ownerName: "Carlos Perez",
        description: "Golden Retriever amigable, lleva collar rojo.",
        photoUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80",
        location: {
            latitude: -12.046374,
            longitude: -77.042793, // Lima aprox
            address: "Parque Kennedy",
            city: "Miraflores, Lima",
            lastSeen: new Date().toISOString(),
            trackingDeviceBattery: "85%"
        }
    },
    {
        id: 2,
        petName: "Rex",
        ownerName: "Ana Gomez",
        description: "Pastor Alemán, entrenado.",
        photoUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=300&q=80",
        location: {
            latitude: -12.096374,
            longitude: -77.022793,
            address: "Av. Arequipa 500",
            city: "San Isidro, Lima",
            lastSeen: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            trackingDeviceBattery: "42%"
        }
    },
    {
        id: 3,
        petName: "Luna",
        ownerName: "Luis Martinez",
        location: {
            latitude: -12.126374,
            longitude: -77.012793,
            address: "Malecón de Chorrillos",
            city: "Chorrillos, Lima",
            lastSeen: new Date(Date.now() - 7200000).toISOString(),
            trackingDeviceBattery: "15%"
        }
    },
    {
        id: 4,
        petName: "Max",
        ownerName: "Maria Rodriguez",
        location: {
            latitude: -12.076374,
            longitude: -77.062793,
            address: "Plaza San Miguel",
            city: "San Miguel, Lima",
            lastSeen: new Date().toISOString(),
            trackingDeviceBattery: "98%"
        }
    }
];

export const getAllPets = async (): Promise<Pet[]> => {
    try {
        const response = await api.get<Pet[]>('/pets');
        return response.data;
    } catch (error) {
        console.warn("API Error (getAllPets), using mock data:", error);
        return new Promise(resolve => setTimeout(() => resolve(MOCK_PETS), 500));
    }
};

export const getPetById = async (id: number): Promise<Pet | null> => {
    try {
        const response = await api.get<Pet>(`/search/pet/${id}`);
        return response.data;
    } catch (error) {
        console.warn(`API Error (getPetById ${id}), using mock data logic:`, error);
        // Mock search logic
        const found = MOCK_PETS.find(p => p.id === id);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (found) resolve(found);
                else reject(new Error("Pet not found"));
            }, 500);
        });
    }
};
