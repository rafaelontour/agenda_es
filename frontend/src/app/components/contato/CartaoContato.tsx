interface Props {
    nome: string;
    telefone: string
}

export default function CartaoContato({ nome, telefone }: Props) {
    return (
        <div
            className="
                flex flex-col gap-2 p-4
                h-32 lg:w-[23%] rounded-md border-2 border-gray-300
            "
        >
            <p className="text-3xl font-bold">{nome}</p>
            <p>Telefone: {telefone}</p>
        </div>
    )
}