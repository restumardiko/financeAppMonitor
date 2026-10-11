export default async function deleteTransaction({
  transactionId,
  transactionRepo,
}) {
  const transaction = await transactionRepo.delete(transactionId);
  return transaction; //:true/false

  //hapus
  // transaction boleh dihapus kalau belum satu hari
}
