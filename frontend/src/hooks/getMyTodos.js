import axios from "axios";
import { backend_url } from "../../config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from 'recoil';
import { getsetTodos } from "../store/atomstore";
import { useNavigate } from "react-router-dom";

export const GetTodos = () => {
    const token = localStorage.getItem("Ttoken");
    const [mytodos, setmytodos] = useRecoilState(getsetTodos);
    const navigate = useNavigate();
    const [loader, setloader] = useState(false);

    useEffect(() => {
        const fetchTodos = async () => {
            setloader(true);
            try {
                const response = await axios.get(`${backend_url}/todo/todos`, {
                    headers: {
                        authorization: token
                    }
                });
                setmytodos(response.data.Todos);
                setloader(false);
            } catch (e) {
                setloader(false);
                toast.error("Error fetching todos: " + e.message);
            }
        };

        if (token) {
            fetchTodos();
        } else {
            toast.error("No token found. Please log in.");
            navigate("/login");
        }
    }, [token, navigate, setmytodos]);

    return { loader, mytodos };
};
