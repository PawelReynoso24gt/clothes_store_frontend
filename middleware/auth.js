export default function ({ route, redirect }) {
    const token = localStorage.getItem('token');
  
    // Si no hay token y no está en login, redirige al login
    if (!token && route.name !== 'login') {
      return redirect('/login');
    }
  
    // Si ya hay token y está en login, redirige al inicio
    if (token && route.name === 'login') {
      return redirect('/');
    }
  }