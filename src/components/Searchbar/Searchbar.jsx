import { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, Input, Icon } from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (inputValue.trim().length === 0) {
      alert('Введіть значення для пошуку!');
      return;
    }
    onSubmit(inputValue);
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };
  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <Icon />
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleInputChange}
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
