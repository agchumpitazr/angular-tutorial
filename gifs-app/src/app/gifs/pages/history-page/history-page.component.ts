import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { GifService } from '../../services/gifs.service';
import { ListComponent } from "../../components/list/list.component";

@Component({
  selector: 'app-history-page',
  imports: [ListComponent],
  templateUrl: './history-page.component.html'
})
export default class HistoryPageComponent {

  gifService = inject(GifService);

  // ActivatedRoute: servicio que proporciona información sobre la ruta activada asociada al componente cargado en una ruta
  // .params is an observable (we can subscribe to it)

  // query = inject(ActivatedRoute).params.subscribe( params => {
  //   console.log({params});
  // });

  // toSignal: convierte un observable en una señal
  // map: operador que transforma los datos emitidos por el observable
  // params es un objeto que contiene los parámetros de la ruta, en este caso { query: 'valor' }
  // params['query'] accede al valor del parámetro 'query'
  // this.query es una señal que contiene el valor del parámetro 'query' de la ruta actual
  // cada vez que cambia el parámetro 'query', la señal se actualiza automáticamente

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
    )
  );

  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  });
}
