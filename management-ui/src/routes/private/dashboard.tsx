export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Usuários Ativos</h3>
          <p className="text-3xl font-bold text-indigo-600">1,234</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total de Vendas</h3>
          <p className="text-3xl font-bold text-green-600">R$ 45,678</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Novos Pedidos</h3>
          <p className="text-3xl font-bold text-blue-600">56</p>
        </div>
      </div>
    </div>
  );
}
