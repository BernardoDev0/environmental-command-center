const CollaboratorEquipments = () => {
  return (
    <section className="mt-4 space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">Equipamentos em Posse</h2>
        <p className="text-sm text-muted-foreground">
          Acompanhe todos os bens e equipamentos atualmente vinculados ao colaborador.
        </p>
      </header>
      <div className="rounded-xl border border-border/60 bg-card/40 p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Nenhum equipamento foi associado a este colaborador ainda. Use esta área, futuramente, para listar notebooks,
          celulares, EPIs e outros ativos sob responsabilidade do colaborador.
        </p>
      </div>
    </section>
  );
};

export default CollaboratorEquipments;
