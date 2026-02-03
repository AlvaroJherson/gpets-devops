import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Avatar, Box, CardMedia, Button, CardActions } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { Pet } from '../types/Pet';

interface PetListProps {
    pets: Pet[];
}

const PetList: React.FC<PetListProps> = ({ pets }) => {
    const navigate = useNavigate();

    if (pets.length === 0) {
        return (
            <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
                No se encontraron mascotas.
            </Typography>
        );
    }

    return (
        <Grid container spacing={3} padding={2}>
            {pets.map((pet) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pet.id}>
                    <Card sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 4
                        }
                    }}>
                        {pet.photoUrl && (
                            <CardMedia
                                component="img"
                                height="140"
                                image={pet.photoUrl}
                                alt={pet.petName}
                            />
                        )}
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                {!pet.photoUrl && (
                                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                                        <PetsIcon />
                                    </Avatar>
                                )}
                                <Box>
                                    <Typography variant="h5" component="div">
                                        {pet.petName}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        ID: {pet.id}
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonIcon fontSize="small" /> Dueño: {pet.ownerName}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ p: 2, pt: 0 }}>
                            <Button
                                size="small"
                                variant="contained"
                                startIcon={<VisibilityIcon />}
                                fullWidth
                                onClick={() => navigate(`/pet/${pet.id}`)}
                            >
                                Ver Datos
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default PetList;
