import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert, Card, CardContent, CardMedia, Button, Chip, Divider, Stack, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BatteryStdIcon from '@mui/icons-material/BatteryStd';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getPetById } from '../services/api';
import type { Pet } from '../types/Pet';

const PetDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPet = async () => {
            if (!id) return;
            try {
                const data = await getPetById(parseInt(id, 10));
                setPet(data);
            } catch (err) {
                setError('No se pudo cargar la información de la mascota.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPet();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !pet) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Alert severity="error">{error || 'Mascota no encontrada'}</Alert>
                <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
                    Volver al Inicio
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
                Volver
            </Button>

            <Card sx={{ boxShadow: 4 }}>
                {pet.photoUrl && (
                    <CardMedia
                        component="img"
                        height="300"
                        image={pet.photoUrl}
                        alt={pet.petName}
                    />
                )}
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h3" component="div" color="primary">
                            {pet.petName}
                        </Typography>
                    </Box>

                    <Stack spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon color="action" />
                            <Typography variant="h6">Dueño: {pet.ownerName}</Typography>
                        </Box>

                        <Typography variant="body1" color="text.secondary">
                            ID de Registro: {pet.id}
                        </Typography>

                        {pet.description && (
                            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                                "{pet.description}"
                            </Typography>
                        )}

                        <Divider sx={{ my: 2 }} />

                        {pet.location ? (
                            <Box sx={{ bgcolor: 'background.default', p: 3, borderRadius: 2 }}>
                                <Typography variant="h5" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <LocationOnIcon /> Ubicación en Tiempo Real
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Stack spacing={1}>
                                            <Typography variant="subtitle2" color="text.secondary">Dirección Actual</Typography>
                                            <Typography variant="body1" fontWeight="500">
                                                {pet.location.address}, {pet.location.city}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Stack spacing={1}>
                                            <Typography variant="subtitle2" color="text.secondary">Coordenadas GPS</Typography>
                                            <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                                                {pet.location.latitude.toFixed(6)}, {pet.location.longitude.toFixed(6)}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                    <Chip
                                        icon={<AccessTimeIcon />}
                                        label={`Visto: ${new Date(pet.location.lastSeen).toLocaleString()}`}
                                        variant="outlined"
                                    />
                                    {pet.location.trackingDeviceBattery && (
                                        <Chip
                                            icon={<BatteryStdIcon />}
                                            label={`Batería: ${pet.location.trackingDeviceBattery}`}
                                            color={parseInt(pet.location.trackingDeviceBattery) > 20 ? "success" : "error"}
                                        />
                                    )}
                                </Box>
                            </Box>
                        ) : (
                            <Alert severity="warning">No hay datos de ubicación disponibles.</Alert>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
};

export default PetDetailPage;
