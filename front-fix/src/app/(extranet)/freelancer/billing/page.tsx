'use client';

import { useState, useEffect } from 'react';
import { billingService, type Invoice } from '@/services/billing.service';

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await billingService.getInvoices(selectedYear);
        setInvoices(data);
      } catch (err) {
        setError('Erreur lors du chargement des factures');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [selectedYear]);

  const getStatusLabel = (status: Invoice['status']) => {
    switch (status) {
      case 'draft':
        return 'Brouillon';
      case 'sent':
        return 'Envoyée';
      case 'paid':
        return 'Payée';
    }
  };

  const downloadInvoice = async (invoiceId: number) => {
    try {
      await billingService.downloadInvoice(invoiceId);
    } catch (err) {
      console.error('Erreur lors du téléchargement de la facture:', err);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div>
      <h1>Facturation</h1>

      <div>
        <h2>Résumé</h2>
        <div>
          <div>
            <h3>Montant total</h3>
            <p>{totalAmount.toLocaleString()}€</p>
          </div>
          <div>
            <h3>Montant payé</h3>
            <p>{paidAmount.toLocaleString()}€</p>
          </div>
          <div>
            <h3>En attente</h3>
            <p>{(totalAmount - paidAmount).toLocaleString()}€</p>
          </div>
        </div>
      </div>

      <div>
        <h2>Factures</h2>
        <div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Mission</th>
              <th>Client</th>
              <th>Date</th>
              <th>Échéance</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice.id}>
                <td>{invoice.number}</td>
                <td>{invoice.mission.title}</td>
                <td>{invoice.mission.company.name}</td>
                <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                <td>{invoice.amount.toLocaleString()}€</td>
                <td>{getStatusLabel(invoice.status)}</td>
                <td>
                  <button onClick={() => downloadInvoice(invoice.id)}>
                    Télécharger
                  </button>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan={8}>Aucune facture pour cette année</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 