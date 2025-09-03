export default function Reports() {
  const reports = [
    { id: 1, name: 'Relatório de Vendas', date: '2025-09-02', status: 'Completo' },
    { id: 2, name: 'Análise de Usuários', date: '2025-09-01', status: 'Pendente' },
    { id: 3, name: 'Métricas de Acesso', date: '2025-08-31', status: 'Em Progresso' },
  ];

  return (
    <div className="p-4">
      <div className="sm:flex sm:items-center sm:justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Relatórios</h1>
        <button className="mt-3 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Gerar Relatório
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="grid gap-4 p-4">
          {reports.map((report) => (
            <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-500">Data: {report.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  report.status === 'Completo' ? 'bg-green-100 text-green-800' :
                  report.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {report.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
