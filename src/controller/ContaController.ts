import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/Colors";

export class ContaController implements ContaRepository{

    private lista_contas: Array<Conta> = new Array<Conta>();
    numero: number = 0;

    listar_todas(): void{
        for(let conta of this.lista_contas){
            conta.visualizar();
        };
    }

    procurar_por_numero(numero: number): void {
        let busca_conta = this.buscar_no_array(numero);
        if (busca_conta != null){
            busca_conta.visualizar();
        }else
            console.log(colors.fg.red, "\nA Conta numero: " + numero + " não foi encontrada!", colors.reset);
    }

    cadastrar(conta: Conta): void {
        this.lista_contas.push(conta);
        console.log(colors.fg.green, "\nA Conta número: " + conta.numero + " foi criada com sucesso!", colors.reset);
    }

    atualizar(conta: Conta): void {
        let busca_conta = this.buscar_no_array(conta.numero);
        if (busca_conta != null){
           this.lista_contas[this.lista_contas.indexOf(busca_conta)] = conta;
           console.log(colors.fg.green, "\nA Conta numero: " + conta.numero + " foi atualizada com sucesso!", colors.reset);
        }else
            console.log(colors.fg.red, "\nA Conta numero: " + conta.numero + " não foi encontrada!", colors.reset);
    }

    deletar(numero: number): void {
        let busca_conta = this.buscar_no_array(numero);
        if (busca_conta != null){
            this.lista_contas.splice(this.lista_contas.indexOf(busca_conta), 1);
            console.log(colors.fg.green, "\nA Conta numero: " + numero + " foi apagada com sucesso!", colors.reset);
        }else
            console.log(colors.fg.red, "\nA Conta numero: " + numero + " não foi encontrada!", colors.reset);
    }

    public sacar(numero: number, valor: number): void {
        let conta = this.buscar_no_array(numero);

        if (conta!= null){
            if(conta.sacar(valor) == true)
                console.log(colors.fg.green, "\nO Saque na Conta numero: " + numero + " foi efetuado com sucesso!", colors.reset);
        }else
            console.log(colors.fg.red, "\nA Conta numero: " + numero + " não foi encontrada!", colors.reset);
    }

    public depositar(numero: number, valor: number): void {
        let conta = this.buscar_no_array(numero);

        if (conta!= null){
            conta.depositar(valor);
            console.log(colors.fg.green, "\nO Depósito na Conta numero: " + numero + " foi efetuado com sucesso!", colors.reset);
        }else
            console.log(colors.fg.red, "\nA Conta numero: " + numero + " não foi encontrada!", colors.reset);
    }

    public transferir(numero_origem: number, numero_destino: number, valor: number): void {
        let conta_origem = this.buscar_no_array(numero_origem);
        let conta_destino = this.buscar_no_array(numero_destino);

         if (conta_origem != null && conta_destino != null){
            if (conta_origem.sacar(valor) == true){
                conta_destino.depositar(valor);
                console.log(colors.fg.green, "\nA Transferência da Conta numero: " + numero_origem + " para a Conta numero: " + numero_destino + " foi efetuado com sucesso!", colors.reset);
            }
        }else
            console.log(colors.fg.red, "\nA Conta numero: " + numero_origem + " e/ou a Conta numero: " + numero_destino + " não foram encontradas!", colors.reset);
    }

    public gerar_numero(): number{
        return ++ this.numero;
    }

    public buscar_no_array(numero: number): Conta | null{
        for (let conta of this.lista_contas){
            if (conta.numero === numero)
                return conta;
        }
        return null;
    }
}