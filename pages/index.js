import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

//aios es utilizado para llamar al Api
import axios from 'axios'
import uid from 'uid'

//conectando a aws
// import Amplify from 'aws-amplify';
// import awsmobile from './YOUR-PATH-TO/aws-exports';
// import awsmobile from './aws-exports';
// import aws_exports from '../aws-exports';


// Amplify.configure(awsmobile); 

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const pagina = query.pagina ? Number(query.pagina) : 1
    const respuesta = await axios.get(`http://www.omdbapi.com/?apikey=ced989f5&s=batman&page=${pagina}`)
    const pelicula = respuesta.data.Search
    console.log(respuesta)
    return { pelicula, pagina }
  }

  render() {

      return (
      <div>
        <Head title="Titulo del navegador" />
        <Nav />

         {/* {this.notificationClick()} */}

        {/* Aqui se crea la paginación */}
        {this.renderPaginacion()}



        <div className="main">
          {this.props.pelicula.map((p) =>
            <figure>
              <img src={p.Poster} />
              <figcaption>{p.Title}</figcaption>
            </figure>
          )}



          <style>
            {`
            
            figure {
              display:inline-block;
            }

            a {
              margin:2rem;
            }
            
            `}
          </style>
        </div>
      </div>
    )
  }

  renderPaginacion() {
    let anterior = this.props.pagina > 1 ?
      <Link href={`/?pagina=${this.props.pagina - 1}`}><a>Atrás</a></Link> :
      null;

    return (
      <div>
        {anterior}
        <Link href={`/?pagina=${this.props.pagina + 1}`}><a>Siguiente</a></Link>
      </div>
    )
  }

  notificationClick() {
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
}

