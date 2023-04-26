interface Transaction {
  name: string;
  amount: number;
  date: string;
  type: string;
}

export default function TransactionCard({ transaction }) {
  return (
    <div> 
      <h3>{transaction.name}</h3>
    </div>
  )
}