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
  Tab,
  Tabs,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import logo from "./Logo.jpg";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RegistrationDialog from "./RegistrationDialog";
import EditIcon from "@mui/icons-material/Edit";
import Login from "./login";
import Footer from "./footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [username, setUsername] = useState("");
  const [symbolInput, setSymbolInput] = useState("");
  const [news, setNews] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [stockDataState, setStockDataState] = useState(null);
  const [newsDataState, setNewsDataState] = useState([]);
  const [editingSymbol, setEditingSymbol] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);


  useEffect(() => {
    if (isLoggedIn) {
      fetchNewsData();
    }
  }, [isLoggedIn]);

  const handleLogin = (loginData) => {

    // Send a POST request to your backend to verify the user's credentials
    axios
      .post("http://localhost:7050/auth/login", loginData)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {

          setUsername(loginData.username);
          setShowLoginDialog(false)
          setIsLoggedIn(true);

        } else {

          console.error("Login failed");
        }
      })
      .catch((error) => {

        console.error("Error during login:", error);
      });
  };

  const addToWatchlist = () => {
    setWatchlist([...watchlist, symbolInput]);
    axios.get(`/stocks/${symbolInput}`).then((response) => {
      setStockDataState(response.data);
    });
    setSymbolInput("");
    axios.get(`/news/${symbolInput}`).then((response) => {
      setNewsDataState([...newsDataState, ...response.data]);
      console.log(response.data);
    });
  };

  const removeFromWatchlist = (stockSymbol) => {
    const updatedWatchlist = watchlist.filter(
      (symbol) => symbol !== stockSymbol
    );
    setWatchlist(updatedWatchlist);
  };

  const handleEdit = (index, symbol) => {
    setEditingIndex(index);
    setEditingSymbol(symbol);
  };

  const handleSaveEdit = (index) => {
    // Update the watchlist with the edited symbol at the specified index
    const updatedWatchlist = [...watchlist];
    updatedWatchlist[index] = editingSymbol;

    setWatchlist(updatedWatchlist);

    // Clear the editing state
    setEditingIndex(null);
    setEditingSymbol("");
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

  const handleLogout = () => {
    setUsername("");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <AppBar
        position="static"
        elevation={2}
        sx={{
          backgroundColor: "#1ADB02",
          "&:hover": {
            backgroundColor: "1ADB03",
          },
        }}
      >
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stock Market Watchlist
          </Typography>

          {!isLoggedIn && (<Button onClick={() => {
            if (!isRegistrationOpen) { setShowLoginDialog(true) }
          }} >
            Login
          </Button>)}
          <Login onClose={() => setShowLoginDialog(false)}
            isOpen={showLoginDialog} handleLogin={handleLogin}
          />

          {isLoggedIn ? (
            <>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab
                  label="Watchlist"
                  sx={{ fontSize: 18, fontWeight: "bold", color: "black" }}
                />
                <Tab
                  label="News"
                  sx={{ fontSize: 18, fontWeight: "bold", color: "black" }}
                />
              </Tabs>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Welcome, {username}!
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <IconButton color="inherit" onClick={handleLogout}>
                <ExitToAppIcon />
              </IconButton>
            </>

          ) : (
            <>


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
                  {watchlist.map((symbol, index) => (
                    <ListItem key={symbol} sx={{ paddingY: 1 }}>
                      {editingIndex === index ? (
                        // When editing is enabled
                        <>
                          <TextField
                            value={editingSymbol}
                            onChange={(e) =>
                              setEditingSymbol(e.target.value)
                            }
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => handleSaveEdit(index)}
                            sx={{ marginTop: 2, backgroundColor: "#1ADB02" }}
                          >
                            Save
                          </Button>
                        </>
                      ) : (
                        // When not editing
                        <>
                          <ListItemText primary={symbol} />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="edit"
                              onClick={() => handleEdit(index, symbol)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="remove"
                              onClick={() => removeFromWatchlist(symbol)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </>
                      )}
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
            size="large"
            sx={{ marginTop: 2, backgroundColor: "#1ADB02" }}
            onClick={addToWatchlist}
          >
            Add to Watchlist
          </Button>
        </Paper>
      </Container>
      <div>
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table aria-label="Stock Market Data">
            <TableHead sx={{ backgroundColor: "#1ADB02" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bolder", fontSize: 16, color: "white" }}>
                  Stock
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
                  Price
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
                  Market Cap
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
                  24hr Change
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
                  52 Week High
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
                  52 Week Low
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockDataState &&
                stockDataState.map((stock) => {
                  return (
                    <TableRow key={stock.symbol}>
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
          <Table aria-label="News Data">
            <TableHead>
              <TableRow>
              </TableRow>
            </TableHead>
            <TableBody>
              <Typography variant="h5" sx={{ textAlign: "center" }} gutterBottom>
                Stock News
              </Typography>
              {newsDataState &&
                newsDataState.map((news) => {
                  return (
                    <div key={news.id}>
                      <Card sx={{ marginBottom: 2, backgroundColor: "#f9f9f9" }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {news.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {news.link}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Footer />
    </div>
  );
}

export default App;
