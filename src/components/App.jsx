import { useState, useEffect } from 'react';
import fetchImages from './API/fetchImages';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { Loader } from './Loader/Loader';
import Button from './Button/Button';
import { AppWrapper } from './Searchbar/App.styled';

export const App = () => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (value !== '') {
      setIsLoading(true);
      fetchImages(value, page)
        .then(({ data }) =>
          setImages(prevImages => [...prevImages, ...data.hits])
        )
        .catch(err => alert(err.message))
        .finally(() => setIsLoading(false));
    }
  }, [value, page]);

  const handleSearchbarSubmit = value => {
    setValue(value);
    setPage(1);
    setImages([]);
  };

  const setIsModalData = modalData => {
    setModalData(modalData);
    setIsModalOpen(true);
  };

  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Searchbar onFormSubmit={handleSearchbarSubmit} />
      <AppWrapper>
        <ImageGallery images={images} onImageClick={setIsModalData} />
      </AppWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        images.length > 0 && <Button onClick={changePage} />
      )}
      {isModalOpen && (
        <Modal modalData={modalData} onModalClose={handleModalClose} />
      )}
    </>
  );
};
