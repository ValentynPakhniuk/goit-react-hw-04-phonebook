import { useState } from 'react';
import { Button } from 'components/Button/Button.styled';
import { Box, Form } from './ContainerForm.styled';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [id, setId] = useState('');

  const handleChangeName = ({ target: { value } }) => {
    setName(value);
    setId(nanoid());
  };
  const handleChangeNumber = ({ target: { value } }) => {
    setNumber(value);
  };

  const handleClick = e => {
    e.preventDefault();
    addContact({
      name,
      number,
      id,
    });
  };

  return (
    <Form onSubmit={handleClick}>
      <Box>
        <div>
          <label htmlFor="exampleInputName">Name</label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChangeName}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="exampleInputNumber">Number</label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChangeNumber}
            value={number}
          />
        </div>
        <Button type="submit">Add contact</Button>
      </Box>
    </Form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
