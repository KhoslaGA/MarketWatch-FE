import React from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from '@mui/material';


function StockMarketTable({ stockData }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="Stock Market Data">
                <TableHead>
                    <TableRow>
                        <TableCell>Stock</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Market Cap</TableCell>
                        <TableCell>24hr Change</TableCell>
                        <TableCell>52 Week High</TableCell>
                        <TableCell>52 Week Low</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{stockData.ticker}</TableCell>
                        <TableCell>{stockData.price}</TableCell>
                        <TableCell>{stockData.marketcap}</TableCell>
                        <TableCell>{stockData.priceChange}</TableCell>
                        <TableCell>{stockData.week52High}</TableCell>
                        <TableCell>{stockData.week52Low}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default StockMarketTable;