import React, { useState, useEffect } from 'react';
import { useMovie } from '../../Providers/movies';
import { Card, Input, Modal, Button } from 'antd';
//import styles from './movieDetails.module.css';
const MoviesDetails = () => {
    const { getMovie, Movies } = useMovie();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        getMovie();
    }, []);
    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setModalVisible(true);
    };
    const handleModalClose = () => {
        setSelectedMovie(null);
        setModalVisible(false);
    };
    const playMovie = () => {
        const movieUrl =
            'https://go.wootly.ch/dash?source=web&id=becdceed471cd82d7dcc683ee2c1a61782e36745&sig=CxeADMEYJskU_kpTjr1M-w&expire=1684670571&ofs=11&usr=175838';
        window.open(movieUrl, '_blank');
    };

    return (
        <div>
            <div>
                <Input
                    placeholder="Search movies by title"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                />
            </div>
            <div>
                {filteredMovies.map((movie) => (
                    <div key={movie.id} onClick={() => handleMovieClick(movie)}>
                        {movie.title}
                    </div>
                ))}
            </div>
            {selectedMovie && (
                <Modal
                    visible={modalVisible}
                    onCancel={handleModalClose}
                    footer={[
                        <Button
                            key="trailer"
                            type="primary"
                            onClick={() =>
                                window.open(selectedMovie.trailer, '_blank')
                            }
                        >
                            Watch Trailer
                        </Button>,
                        <Button key="movie" type="primary" onClick={playMovie}>
                            Play Movie
                        </Button>,
                    ]}
                >
                    <div>
                        <img
                            src={selectedMovie.picture}
                            alt={selectedMovie.title}
                        />
                        <h2>{selectedMovie.title}</h2>
                        <p>{selectedMovie.description}</p>
                    </div>
                </Modal>
            )}
        </div>
    );
};
export default MoviesDetails;
