import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const ExpenseList = () => {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchExpenses();
  }, [currentPage]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`/api/v1/expense/getexpenses`, {
        withCredentials: true,
      });
      console.log("API Response:", response.data);
      setExpenses(response.data.expenses);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch expenses",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/expense/delete/${id}`, {
        withCredentials: true,
      });
      await fetchExpenses();
      toast({ title: "Success", description: "Expense deleted successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete expense",
        variant: "destructive",
      });
    }
  };

  const openModal = (expense = null) => {
    setSelectedExpense(
      expense || { category: "", amount: 0, description: "", date: "" }
    );
    setIsAdding(!expense);
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isAdding) {
        const response = await axios.post(
          "/api/v1/expense/add",
          selectedExpense,
          { withCredentials: true }
        );
        const newExpense = response.data.expense;
        if (!newExpense || !newExpense.category) {
          await fetchExpenses();
        } else {
          await fetchExpenses();
        }
        toast({ title: "Success", description: "Expense added successfully" });
      } else {
        await axios.put(
          `/api/v1/expense/update/${selectedExpense._id}`,
          selectedExpense,
          { withCredentials: true }
        );
        await fetchExpenses();
        toast({
          title: "Success",
          description: "Expense updated successfully",
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save expense",
        variant: "destructive",
      });
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setCurrentPage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-4 shadow-md">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg">Expense Tracker</CardTitle>
        <Button onClick={() => openModal()}>Add Expense</Button>
      </CardHeader>
      <CardContent>
        {expenses.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense._id}>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>₹{expense.amount}</TableCell>
                    <TableCell>
                      {new Date(expense.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => openModal(expense)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(expense._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {renderPaginationItems()}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <p>No expenses found.</p>
        )}
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isAdding ? "Add Expense" : "Update Expense"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <Label>Category</Label>
            <Input
              type="text"
              value={selectedExpense?.category || ""}
              onChange={(e) =>
                setSelectedExpense({
                  ...selectedExpense,
                  category: e.target.value,
                })
              }
            />
            <Label>Amount</Label>
            <Input
              type="number"
              value={selectedExpense?.amount || ""}
              onChange={(e) =>
                setSelectedExpense({
                  ...selectedExpense,
                  amount: e.target.value,
                })
              }
            />
            <Label>Description</Label>
            <Textarea
              value={selectedExpense?.description || ""}
              onChange={(e) =>
                setSelectedExpense({
                  ...selectedExpense,
                  description: e.target.value,
                })
              }
            />
            <Label>Date</Label>
            <Input
              type="date"
              value={selectedExpense?.date?.split("T")[0] || ""}
              onChange={(e) =>
                setSelectedExpense({ ...selectedExpense, date: e.target.value })
              }
            />
            <Button type="submit">
              {isAdding ? "Add Expense" : "Save Changes"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ExpenseList;
