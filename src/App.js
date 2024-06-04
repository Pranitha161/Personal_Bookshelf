import './App.css';
import BookPage from './components/bookpage/BookPage';
import BookSearch from './components/bookSearch/BookSearch';
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import Bookshelf from './components/bookshelf/Bookshelf';
function App() {
  let router=createBrowserRouter([
    {
      path:'',
      element:<BookPage/>,
      children:[
        {
          path:'/searchpage',
          element:<BookSearch/>
        },
        {
          path:'/bookshelf',
          element:<Bookshelf/>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
