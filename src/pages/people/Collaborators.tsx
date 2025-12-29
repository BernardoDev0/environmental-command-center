import { useParams } from "react-router-dom";

const Collaborators = () => {
  return (
    <main className="p-6">
      <section className="space-y-4">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Colaboradores</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie a lista de colaboradores, perfis individuais e relacionamento com equipamentos.
          </p>
        </header>
        <div className="rounded-lg border border-dashed border-muted-foreground/30 p-8 text-center text-sm text-muted-foreground">
          Nenhum colaborador foi cadastrado ainda. Quando existirem registros, você poderá acessar o perfil completo.
        </div>
      </section>
    </main>
  );
};

export default Collaborators;
