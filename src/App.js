import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  AppBar,
  Button,
  Container,
  List,
  ListItem,
  TextField,
  Toolbar,
  Typography,
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import RegistrationDialog from "./RegistrationDialog";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [username, setUsername] = useState("");
  const [symbolInput, setSymbolInput] = useState("");
  const [news, setNews] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      fetchNewsData();
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setUsername("exampleUser");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername("");
    setIsLoggedIn(false);
  };

  const [stockDataState, setStockDataState] = useState(null);

  const addToWatchlist = () => {
    // if (symbolInput.trim() !== "" && !watchlist.includes(symbolInput)) {
    setWatchlist([...watchlist, symbolInput]);
    axios.get(`/stocks/${symbolInput}`).then((response) => {
      setStockDataState(response.data);
    });
    setSymbolInput("");
    // }
  };

  const removeFromWatchlist = (stockSymbol) => {
    const updatedWatchlist = watchlist.filter(
      (symbol) => symbol !== stockSymbol
    );
    setWatchlist(updatedWatchlist);
  };

  const fetchNewsData = () => {
    // Replace with your actual news API endpoint
    fetch("")
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error fetching news:", error));
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleRegister = () => {
    setIsRegistrationOpen(true);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stock Market Watchlist
          </Typography>
          {isLoggedIn ? (
            <>
              <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab label="Watchlist" />
                <Tab label="News" />
              </Tabs>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Welcome, {username}!
              </Typography>
              <IconButton color="inherit" onClick={handleLogout}>
                <AccountCircle />
              </IconButton>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
              <Button color="inherit" onClick={handleRegister}>
                Register
              </Button>
              <RegistrationDialog
                isOpen={isRegistrationOpen}
                onClose={setIsRegistrationOpen}
              />
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        {isLoggedIn && (
          <Paper elevation={3}>
            {currentTab === 0 && (
              <div>
                <Typography variant="h6" sx={{ p: 2 }}>
                  My Watchlist
                </Typography>
                <List>
                  {watchlist.map((symbol) => (
                    <ListItem key={symbol}>
                      <ListItemText primary={symbol} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="remove"
                          onClick={() => removeFromWatchlist(symbol)}
                        >
                          X
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </div>
            )}

            {currentTab === 1 && (
              <div>
                <Typography variant="h6" sx={{ p: 2 }}>
                  News
                </Typography>
                <ul>
                  {news.map((item, index) => (
                    <li key={index}>{item.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </Paper>
        )}

        <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
          <Typography variant="h6">Search a Stock</Typography>
          <TextField
            label="Enter stock symbol"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={symbolInput}
            onChange={(e) => setSymbolInput(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={addToWatchlist}
          >
            Add to Watchlist
          </Button>
        </Paper>
      </Container>
      <div>
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
            {stockDataState &&
              stockDataState.map((stock) => {
                console.log(stock);
                return (
                  <TableRow>
                        <TableCell>{stock.symbol}</TableCell>
                        <TableCell>{stock.regularMarketPrice}</TableCell>
                        <TableCell>{stock.marketCap}</TableCell>
                        <TableCell>{stock.regularMarketChange}</TableCell>
                        <TableCell>{stock.fiftyTwoWeekHigh}</TableCell>
                        <TableCell>{stock.fiftyTwoWeekLow}</TableCell>
                    </TableRow>
                );
              })}
          </TableBody>
        </Table>
        </TableContainer>
        </div>
        </div>
  );
}

export default App;
