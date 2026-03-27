import "../style/help.css";

export function Help() {
  return (
    <div className="help-container">

      <h1 className="help-title">Manual de usuario</h1>

      <h2 className="help-subtitle">Indicaciones:</h2>

      <hr className="help-divider" />

      <p className="help-text">
        Este manual está dedicado a todos los usuarios que posean disposición de esta aplicación,
        la cual tiene como objetivo agilizar el proceso de auditorías.
        Esta dispone de ciertas funcionalidades y herramientas las cuales serán mencionadas
        en forma de guía.
      </p>


      <h2 className="help-section-title">
        1.0 Página principal "principal":
      </h2>

      <p className="help-text">
        Esta es la pestaña principal a la que se ingresa automáticamente al ingresar en la app.
        Aquí se podrán observar las acciones ya creadas que se encuentran en la app,
        la misma está ordenada de más reciente a más antigua.
      </p>


      <h3 className="help-section-subtitle">
        1.1 Componentes de una acción:
      </h3>

      <p className="help-text">
        Las acciones poseen distintos campos los cuales describen algo en específico.
      </p>

      <ul className="help-list">

        <li className="help-item">
          <strong className="help-item-title">Título:</strong>
          <p className="help-item-text">Es el nombre de la acción.</p>
        </li>

        <li className="help-item">
          <strong className="help-item-title">Descripción:</strong>
          <p className="help-item-text">Describe los detalles de la acción.</p>
        </li>

        <li className="help-item">
          <strong className="help-item-title">Estado:</strong>
          <p className="help-item-text">
            Describe el estado en el que se encuentra, de las cuales hay cuatro:
          </p>

          <ul className="help-sublist">

            <li className="help-subitem">
              <strong>Iniciada:</strong>
              <p>Es una acción recién creada.</p>
            </li>

            <li className="help-subitem">
              <strong>En curso:</strong>
              <p>Es una acción creada que está en proceso.</p>
            </li>

            <li className="help-subitem">
              <strong>Completada:</strong>
              <p>Es una acción que ya cumplió su propósito.</p>
            </li>

            <li className="help-subitem">
              <strong>Cerrada:</strong>
              <p>Es una acción que ya ha finalizado.</p>
            </li>

          </ul>
        </li>


        <li className="help-item">
          <strong className="help-item-title">Origen:</strong>

          <p className="help-item-text">
            El origen de por qué se creó la acción, las cuales son 2:
          </p>

          <ul className="help-sublist">

            <li className="help-subitem">
              <strong>Auditoría interna:</strong>
              <p>
                Indica que fue por una auditoría dentro de la empresa.
              </p>
            </li>

            <li className="help-subitem">
              <strong>Auditoría externa:</strong>
              <p>
                Indica que fue por una auditoría realizada por un tercero.
              </p>
            </li>

          </ul>
        </li>


        <li className="help-item">
          <strong className="help-item-title">Tipo:</strong>

          <p className="help-item-text">
            Indica qué tipo de acción es, las cuales son 3:
          </p>

          <ul className="help-sublist">

            <li className="help-subitem">
              <strong>Observación:</strong>
              <p>
                Es un defecto que posee el departamento que se obtiene
                a raíz de una muestra en una auditoría.
              </p>
            </li>

            <li className="help-subitem">
              <strong>No conformidad:</strong>
              <p>
                Es como una observación pero se ven varios errores en vez de uno.
              </p>
            </li>

            <li className="help-subitem">
              <strong>Oportunidad de mejora:</strong>
              <p>
                No es un error, es un proceso que puede mejorar y suele ser opcional.
              </p>
            </li>

          </ul>
        </li>


        <li className="help-item">
          <strong className="help-item-title">Norma:</strong>

          <p className="help-item-text">
            Esta es la norma por la que se rige una acción, de las cuales hay tres:
          </p>

          <ul className="help-sublist">

            <li className="help-subitem">Norma Covenin</li>

            <li className="help-subitem">Norma PDVSA</li>

            <li className="help-subitem">Norma ISO9001</li>

          </ul>
        </li>


        <li className="help-item">
          <strong className="help-item-title">Descripción de cierre:</strong>

          <p className="help-item-text">
            Una breve descripción que se agrega cuando se cierra una acción.
          </p>
        </li>


        <li className="help-item">
          <strong className="help-item-title">Fecha de inicio:</strong>

          <p className="help-item-text">
            Es la fecha en la que se crea una acción.
          </p>
        </li>


        <li className="help-item">
          <strong className="help-item-title">Fecha de cierre:</strong>

          <p className="help-item-text">
            Es la fecha en donde debe acabar la acción
            (esta fecha puede cambiar en algunos casos donde sea necesario).
          </p>
        </li>


        <li className="help-item">
          <strong className="help-item-title">Documentos adjuntos:</strong>

          <p className="help-item-text">
            Las acciones creadas en la app son una representación de una acción real
            creada en formatos Word u otro tipo de archivo.
            Por lo tanto, al crear la acción en la app se adjunta el archivo real
            y este al ser clickeado se abrirá para visualizar la acción
            u obtener más detalles.
          </p>
        </li>


        <li className="help-item">
          <strong className="help-item-title">Departamentos:</strong>

          <p className="help-item-text">
            Una acción puede ser creada por cualquier departamento de la empresa
            que posee esta app, como lo puede ser informática y telecomunicaciones,
            recursos humanos (RRHH), departamento de calidad, etc.
          </p>
        </li>

      </ul>



      <h3 className="help-section-subtitle">
        1.2 Colores de cada acción:
      </h3>

      <p className="help-text">
        Al crear una acción, dependiendo del estado puede tener un color u otro:
      </p>

      <ul className="help-list">

        <li className="help-item color-red">
          Rojo: cuando una acción superó la fecha límite.
        </li>

        <li className="help-item color-green">
          Verde: cuando está completada.
        </li>

        <li className="help-item color-orange">
          Naranja: cuando está en curso.
        </li>

        <li className="help-item color-yellow">
          Amarillo: cuando está en el estado de iniciada.
        </li>

        <li className="help-item color-blue">
          Azul: cuando está en el estado de cerrada.
        </li>

      </ul>



      <h2 className="help-section-title">
        2.0 Crear acciones:
      </h2>

      <p className="help-text">
        En este apartado se puede apreciar un formulario para crear la acción.
        Dichos datos que se ingresan se encuentran en la sección 1.1 de la guía.
        También se podrá observar una lista de observaciones ya creadas.
      </p>



      <h3 className="help-section-subtitle">
        2.1 Editar una acción:
      </h3>

      <p className="help-text">
        Al estar en el apartado de crear una acción se podrán visualizar acciones
        que ya fueron creadas. Dichas acciones se pueden clickear y al hacerlo
        se podrán visualizar los datos en el formulario antes mencionado,
        los cuales se podrán modificar en caso de querer cambiar algo.
      </p>



      <h3 className="help-section-subtitle">
        2.3 Borrar una acción:
      </h3>

      <p className="help-text">
        Al estar en el apartado de crear una acción y clickear una observación
        de la lista, en el formulario aparecerá el botón de borrar para eliminarla.
      </p>

      <p className="help-text">
        Al hacer alguna acción (editar o borrar) automáticamente la app lo colocará
        en la pestaña principal junto a un mensaje de que la acción fue
        creada/editada/borrada exitosamente.
      </p>



      <h2 className="help-section-title">
        3.0 Índice y estadísticas:
      </h2>

      <p className="help-text">
        Esta pestaña muestra una gráfica de las acciones que se encuentran creadas
        y las muestra en barras de color dependiendo del estado.
      </p>

      <ul className="help-list">

        <li className="help-item">Barra azul: acciones cerradas.</li>

        <li className="help-item">Barra verde: acciones completadas.</li>

        <li className="help-item">Barra naranja: acciones en curso.</li>

        <li className="help-item">Barra amarilla: acciones iniciadas.</li>

      </ul>



      <h2 className="help-section-title">
        4.0 Lista maestra:
      </h2>

      <p className="help-text">
        En esta pestaña se muestra la lista maestra de la app.
        Dicha lista muestra los documentos que se encuentran en la lista maestra
        y estos archivos se encuentran de forma local en el servidor de archivos.
      </p>

    </div>
  );
}