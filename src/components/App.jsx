import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { animateScroll as scroll } from 'react-scroll';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { AppContainer, FailLoad } from './App.styled.jsx';

export function App() {
  const [res, setRes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFind, setIsFind] = useState(false);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [hasMoreImages, setHasMoreImages] = useState(false);
  const resRef = useRef([]);

  const onSubmit = inputValue => {
    if (inputValue === value) {
      setPage(page + 1);
      setIsLoading(true);
    } else {
      setIsLoading(true);
      setIsFind(false);
      setValue(inputValue);
      setPage(1);
      setRes([]);
      resRef.current = [];
    }
  };

  useEffect(() => {
    if (!value) return;

    const API_KEY = '35918866-0b9867c5c5e6a777413a575db';
    const requestUrl = `https://pixabay.com/api/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    axios
      .get(requestUrl)
      .then(response => {
        const newRes = response.data.hits;
        const prevRes = resRef.current;
        const updatedRes = [...prevRes, ...newRes];
        setHasMoreImages(
          newRes.length >= 12 && updatedRes.length < response.data.totalHits
        );
        setIsFind(updatedRes.length === 0);
        setRes(updatedRes);
        setIsLoading(false);
        scroll.scrollToBottom({
          duration: 500,
          delay: 100,
          smooth: 'easeInOutQuart',
        });
        resRef.current = updatedRes;
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, [value, page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={onSubmit} />
      {isFind && (
        <FailLoad>Упс, за таким запитом немає результатів :( </FailLoad>
      )}
      {!isLoading && <ImageGallery searchValue={res} />}
      {isLoading && <Loader />}
      {!isLoading && hasMoreImages && <Button loadMore={loadMore} />}
    </AppContainer>
  );
}
