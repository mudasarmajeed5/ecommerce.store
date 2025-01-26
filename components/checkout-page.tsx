'use client';
import React, { useState, useEffect } from 'react';
import {
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from '@/components/ui/dialog';
import { convertToPaisa } from '@/lib/convert-currency';
import { Loader } from 'lucide-react';
import { DialogTitle } from '@radix-ui/react-dialog';

const CheckoutPage = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [clientSecret, setClientSecret] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: convertToPaisa(amount) }),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to create payment intent');
                return res.json();
            })
            .then((data) => setClientSecret(data.clientSecret))
            .catch((error) => {
                console.error('Error fetching client secret:', error);
                setErrorMessage('Unable to initiate payment. Please try again later.');
            });
    }, [amount]);

    const handlePaymentSubmission = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) return;

        const { error: submitError } = await elements.submit();
        if (submitError?.message) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `https://enchantglow.vercel.app/payment-success?amount=${amount}`,
            },
        });

        if (error) {
            setErrorMessage(error.message || 'An unknown error occurred.');
            setLoading(false);
            return;
        }
        setLoading(false);
    };

    if (!clientSecret || !elements || !stripe) {
        return (
            <div className="flex w-full justify-center items-center">
                <Loader className="w-6 h-6 text-black animate-spin" />
            </div>
        );
    }

    return (
        <>
            <form className="bg-white p-4">
                {clientSecret && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="bg-blue-600 text-white px-2 py-1 hover:bg-blue-500"
                                size="sm"
                                variant="outline"
                            >
                                Make Payment
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogTitle />
                            <PaymentElement className="relative z-[102]" />
                            <DialogFooter>
                                <button className='bg-black text-white p-2 rounded-md' onClick={handlePaymentSubmission}>
                                    {!loading ? `Pay Rs. ${amount}/-` : 'Processing...'}
                                </button>

                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </>
    );
};

export default CheckoutPage;
