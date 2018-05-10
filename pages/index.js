import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

//aios es utilizado para llamar al Api
import axios from 'axios'
import uid from 'uid'


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

  notificationClick(){
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







// export default () => (

//   <div>
//     <Head title="Titulo del navegador" />
//     <Nav />

//     <div className="hero">
//       <h1 className="title">Welcome to Next!</h1>
//       <p className="description">To get started, edit <code>pages/index.js</code> and save to reload.</p>

//       <div className="row">
//         <Link href="https://github.com/zeit/next.js#getting-started">
//           <a className="card">
//             <h3>Getting Started &rarr;</h3>
//             <p>Learn more about Next on Github and in their examples</p>
//           </a>
//         </Link>
//         <Link href="https://open.segment.com/create-next-app">
//           <a className="card">
//             <h3>Examples &rarr;</h3>
//             <p>
//               Find other example boilerplates on the <code>create-next-app</code> site
//             </p>
//           </a>
//         </Link>
//         <Link href="https://github.com/segmentio/create-next-app">
//           <a className="card">
//             <h3>Create Next App &rarr;</h3>
//             <p>Was this tool helpful? Let us know how we can improve it</p>
//           </a>
//         </Link>
//       </div>
//     </div>

//     <style jsx>{`
//       .hero {
//         width: 100%;
//         color: #333;
//       }
//       .title {
//         margin: 0;
//         width: 100%;
//         padding-top: 80px;
//         line-height: 1.15;
//         font-size: 48px;
//       }
//       .title, .description {
//         text-align: center;
//       }
//       .row {
//         max-width: 880px;
//         margin: 80px auto 40px;
//         display: flex;
//         flex-direction: row;
//         justify-content: space-around;
//       }
//       .card {
//         padding: 18px 18px 24px;
//         width: 220px;
//         text-align: left;
//         text-decoration: none;
//         color: #434343;
//         border: 1px solid #9B9B9B;
//       }
//       .card:hover {
//         border-color: #067df7;
//       }
//       .card h3 {
//         margin: 0;
//         color: #067df7;
//         font-size: 18px;
//       }
//       .card p {
//         margin: 0;
//         padding: 12px 0 0;
//         font-size: 13px;
//         color: #333;
//       }
//     `}</style>
//   </div> 

// )

