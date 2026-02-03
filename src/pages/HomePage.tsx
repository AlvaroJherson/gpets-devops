import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import SearchBar from '../components/SearchBar';
import PetList from '../components/PetList';
import { getAllPets, getPetById } from '../services/api';
import type { Pet } from '../types/Pet';

const HomePage = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadAllPets = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllPets();
            setPets(data);
        } catch (err) {
            setError('Error cargando mascotas. Por favor intente de nuevo.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (id: string) => {
        setLoading(true);
        setError(null);
        setPets([]);
        try {
            const numericId = parseInt(id, 10);
            if (isNaN(numericId)) {
                setError('El ID debe ser un número');
                setLoading(false);
                return;
            }
            const pet = await getPetById(numericId);
            if (pet) {
                setPets([pet]);
            } else {
                setPets([]);
            }
        } catch (err) {
            setError('Mascota no encontrada o error de API.');
            setPets([]);
        } finally {
            setLoading(false);
        }
    };

    const handleClearSearch = () => {
        loadAllPets();
    };

    useEffect(() => {
        loadAllPets();
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" color="primary" gutterBottom>
                    Encuentra tu Mascota
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Busca por ID o ve todas las mascotas registradas
                </Typography>
            </Box>

            <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                    {error}
                </Alert>
            )}

            {!loading && !error && (
                <PetList pets={pets} />
            )}
        </Container>
    );
};

export default HomePage;
