import { Ticket } from "../database/Models/Ticket.js";

export default new class TicketController {
    async create(req, res, next) {
        const { ticket_id, costumer, telephone } = req.params;

        if (!(req.body)) {
            return res.status(500).send({
                status: 'Deu erro hein',
                message: 'O numero do ponto e o quem comprou são informações importantes'
            })
        }

        try {
            let ticket = new Ticket({
                ticket_id: ticket_id,
                status: 'pendente',
                costumer: costumer,
                telephone: telephone
            })

            res.status(200).send({
                status: 'Sucesso',
                message: 'Compra do ponto feita com sucesso'
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 'Deu erro hein',
                message: error.message
            })
        }
    }
    
    async show(req, res, next) {

        try {
            let ticket = new Ticket().showAll()

            res.status(200).send({
                status: 'Sucesso',
                message: 'Listagem de pontos carregadas com sucesso',
                tickets: await ticket
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 'Deu erro hein',
                message: error.message
            })
        }
    }

    async limit(req, res, next) {

        try {
            let ticket = new Ticket().ShowTicketLimit()

            res.status(200).send({
                status: 'Sucesso',
                message: 'Listagem de pontos carregadas com sucesso',
                tickets: await ticket
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 'Deu erro hein',
                message: error.message
            })
        }
    }

    async updateLimit(req, res, next) {
        const { number } = req.params

        if (!(req.body)) {
            return res.status(500).send({
                status: 'Deu erro hein',
                message: 'Acho que voce esqueceu de colocar qual o valor'
            })
        }

        try {
            new Ticket().UpdateTicketLimit({
                number: number
            })

            res.status(200).send({
                status: 'Sucesso',
                message: 'Quantidade de pontos alteradas com sucesso'
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 'Deu erro hein',
                message: error.message
            })
        }

    }
    
    async paid(req, res) {
        const { ticket_id } = req.params;

        if (!(req.body)) {
            return res.status(500).send({
                status: 'Deu erro hein',
                message: 'Acho que voce esqueceu de informar qual o ponto comprado'
            })
        }

        try {
            let ticket = new Ticket().UpdateTicketStatus({
                ticket_id: ticket_id
            })

            res.status(200).send({
                status: 'success',
                message: 'Agora o ticket '+ticket_id+' foi marcado como pago',
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 'Deu erro hein',
                message: error.message
            })
        }
    }
}