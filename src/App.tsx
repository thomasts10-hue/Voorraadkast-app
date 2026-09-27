import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { AddProduct } from './pages/AddProduct'
import { ShoppingList } from './pages/ShoppingList'
import { Account } from './pages/Account'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/producten" element={<Products />} />
        <Route path="/toevoegen" element={<AddProduct />} />
        <Route path="/lijst" element={<ShoppingList />} />
        <Route path="/account" element={<Account />} />
      </Route>
    </Routes>
  )
}

export default App
