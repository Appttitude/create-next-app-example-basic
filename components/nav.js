import Head from './head'
import Link from 'next/link'


const pushNotification = () => {
  if (window.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission(status => {
      console.log(status)
      let n = new Notification('Titulo', {
        body: 'Soy una notificación de prueba :)',
        icon: 'https://move.appttitude.com/images/logo.png'
      })
    })
  }
}

 
const Nav = () => (
  <nav>
    <figure>
      <img src="https://move.appttitude.com/images/logo.png" />
       <button>Click para recibir notificaciones</button>
    </figure>

    <ul>
      <li>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
      </li>
    </ul>

    <style jsx>{`
    li {
      list-style-type:none;
    }
    `}</style>
  </nav>
)

export default Nav
