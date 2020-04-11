import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    constructor(private http: HttpClient,
                private toastyService: ToastrService) {
    }

    showToast(type, title, message) {
        this.toastyService[type](message, title, );
    }


    getAllSeats(): Observable<any> {
        return this.http.get('http://localhost:8000/seats');
    }

    reserveSeat(searNumber) {
        return this.http.put('http://localhost:8000/seat/reserve/' + searNumber, {});
    }

    cancelReservation(searNumber) {
        return this.http.put('http://localhost:8000/seat/cancel/' + searNumber, {});
    }
}

export enum ToastType {
    Success = 'success',
    Error = 'error'
}
