const Home = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Welcome to Our App</h1>
      <div className='flex flex-col space-y-4'>
        <a href='/login' className='bg-blue-500 text-white py-2 px-4 rounded'>
          Login
        </a>{' '}
        <br />
        <a
          href='/register'
          className='bg-green-500 text-white py-2 px-4 rounded'>
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Home;
