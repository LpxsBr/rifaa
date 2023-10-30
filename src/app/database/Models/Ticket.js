import { sql } from '../database.js'

export class Ticket {

    #ticket_id
    #status
    #costumer
    #telephone

    constructor(props) {
        if (props) {
            let ticket_id = props.ticket_id
            let status = props.status
            let costumer = props.costumer
            let telephone = props.telephone

            return this.create({ ticket_id, status, costumer, telephone })
        }
    }

    async create({ ...props }) {
        const { ticket_id, status, costumer, telephone } = props
        try {
            // console.log('ok');
            await sql`
                insert into tickets
                    (ticket_id, status, costumer, telephone)
                values(
                    ${ticket_id}, ${status}, ${costumer}, ${telephone}
                )
            `;

        } catch (error) {
            return error.message
        }

    }
   
    async UpdateTicketStatus({ ...props }) {
        const { ticket_id } = props
        try {
            // console.log('ok');
            await sql`
            update tickets
            set
                status = 'pago'
            where
                ticket_id = ${ticket_id}
            `;

        } catch (error) {
            return error.message
        }
    } 

    async ShowTicketLimit() {
            let lim = await sql`select * from ticket_limit`;
            return lim 
    }

    async UpdateTicketLimit({ ...props }) {
        const { number } = props
        try {
            // console.log('ok');
            await sql`
            UPDATE ticket_limit
            SET value = ${number}
            `;

        } catch (error) {
            return error.message
        }
    }

    async showPerUser() {
        const { costumer } = props
        const ticket = await sql`select * from tickets where costumer = ${costumer}`

        return ticket
    }

    async showAll() {
        const ticket = await sql`select * from tickets`

        return ticket
    }

}