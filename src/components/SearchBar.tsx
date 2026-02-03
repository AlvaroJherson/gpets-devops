import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    onSearch: (id: string) => void;
    onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    const handleClear = () => {
        setQuery('');
        onClear();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 4, mt: 2, justifyContent: 'center' }}>
            <TextField
                label="Buscar por ID"
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                size="small"
                sx={{ width: '300px' }}
                placeholder="Ingresa ID de Mascota (ej. 1)"
            />
            <Button
                type="submit"
                variant="contained"
                startIcon={<SearchIcon />}
                disabled={!query.trim()}
            >
                Buscar
            </Button>
            <Button variant="outlined" onClick={handleClear}>
                Ver Todas
            </Button>
        </Box>
    );
};

export default SearchBar;
