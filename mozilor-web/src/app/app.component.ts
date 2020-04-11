import { Component, OnInit } from '@angular/core';
import { ReservationService, ToastType } from './reservation.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    test = [];
    seats$: Observable<any[]>;
    seats: any;
    seatAllocation: any = {};
    readonly adjacentMatrix = [
        { row: -1, column: -1 },
        { row: -1, column: 0 },
        { row: -1, column: 1 },
        { row: 0, column: -1 },
        { row: 0, column: 1 },
        { row: 1, column: -1 },
        { row: 1, column: 0 },
        { row: 1, column: 1 }
    ];

    readonly numberOfColumns = 10;
    constructor(private reservationService: ReservationService) {
    }

    ngOnInit() {
        this.getAllSeats();
    }

    /**
     * Method to fetch all the seats
     */
    getAllSeats() {
        this.reservationService.getAllSeats().subscribe(result => {
            this.seats = result;
            this.processSeatsData([...result]);
        });
    }

    /**
     * Method to reserve a seat
     */
    reserveSeat(seat) {
        const isValidSelection = this.checkIfSelectedSeatIsValid(seat.id);
        if (isValidSelection) {
            this.reservationService.reserveSeat(seat.id).subscribe((result: any) => {
                this.reservationService.showToast(ToastType.Success, 'Success', result.message);
                this.getAllSeats();
            });
        } else {
            this.reservationService.showToast(ToastType.Error, 'Error', `This seat can't be reserved`);
        }
    }

    /**
     * Method to cancel reservation
     */
    cancelReservation(seat) {
        this.reservationService.cancelReservation(seat.id).subscribe((result: any) => {
            this.reservationService.showToast(ToastType.Success, 'Success', result.message);
            this.getAllSeats();
        });
    }

    /**
     * Method to optimize the ngFor performance
     */
    trackByFunction(item) {
        return item.id;
    }

    /**
     * Method to check if the seat is available
     */
    private checkIfSelectedSeatIsValid(seatNumber) {
        const selectedSeat = this.findSeatIndex(seatNumber);
        const row = Number(selectedSeat.split('_')[0]);
        const column = Number(selectedSeat.split('_')[1]);
        const adjacentItems = this.getAdjacentList(row, column);
        // Check if adjacent records selected
        const reservedList = adjacentItems.filter(item => item.isReserved);
        const isValid = reservedList.length > 0 ? false : true;
        return isValid;
    }

    /**
     * Method to get the adjacent nodes of the selected seat
     */
    private getAdjacentList(row, column) {
        const result = [];
        this.adjacentMatrix.forEach(item => {
            const key = (row + item.row) + '_' + (column + item.column);
            const seat = this.seatAllocation[key];
            if (seat) {
                result.push(seat);
            }
        });
        return result;
    }

    /**
     * Method to find the key of the selected seat in the allocation list
     */
    private findSeatIndex(seatNumber) {
        for (const seatIndex in this.seatAllocation) {
            if (this.seatAllocation.hasOwnProperty(seatIndex)) {
                const seat = this.seatAllocation[seatIndex];
                if (seat.id === seatNumber) {
                    return seatIndex;
                }
            }
        }
    }

    /**
     * Method to create a allocation structure
     */
    private processSeatsData(seats) {
        // Assume that the number of columns is fixed
        for (let row = 0; row < seats.length / this.numberOfColumns; row++) {
            for (let column = 0; column < this.numberOfColumns; column++) {
                this.seatAllocation[row + '_' + column] = seats[(row * 10) + column];
            }
        }
    }
}
