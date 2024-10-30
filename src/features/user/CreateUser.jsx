import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
//import { useNavigate } from 'react-router-dom';
//import Button from '../../ui/Button';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
   // navigate('/menu');
    if (!username) return;
    dispatch(updateName(username))
  }

  return (
    <form onSubmit={handleSubmit} className='text-2xl font-semibold'>
      <p className='mb-4 text-xl md:text-2xl text-stone-600'>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='w-80 px-6 py-2 input mb-4 '
      />

      {username !== '' && (
        <div>
          <button className="bg-yellow-400 uppercase font-semibold text-stone-800 py-5 px-6 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-color dura focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed">Start ordering</button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
