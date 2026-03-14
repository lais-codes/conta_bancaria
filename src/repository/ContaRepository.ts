import { Conta } from "../model/Conta";

export interface ContaRepository{

    procurar_por_numero(numero: number): void;
    listar_todas(): void;
    cadastrar(conta: Conta): void;
    atualizar(conta: Conta): void;
    deletar(numero: number): void;

    sacar(numero: number, valor: number): void;
    depositar(numero: number, valor: number): void;
    transferir(numero_origem: number, numero_destino: number, valor: number): void;
}