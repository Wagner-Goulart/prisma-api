import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).send(allUsers);
  } catch (e) {
    res.status(500).send("Erro na consulta ao banco");
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const useID = req.params.id;
    const filtedUser = await prisma.user.findUnique({
      where: {
        id: Number(useID),
      },
    });
    if (!filtedUser) {
      res.status(404).send("Usuário não encontrado");
    }
    res.status(200).send(filtedUser);
  } catch (e) {
    res.status(500).send("Erro na consulta ao banco");
  }
});

router.post("/", async (req, res) => {
  try {
    const createdUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(201).send(createdUser);
  } catch (e) {
    res.status(500).send("Erro na consulta ao banco" + e);
  }
});

router.put("/user/:id", async (req, res) => {
  const useID = req.params.id;

  try {
    const updateUser = await prisma.user.update({
      where: {
        id: Number(useID),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(200).send("Usurário atualizado com sucesso");
  } catch (e) {
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

router.delete("/user/:id", async (req, res) => {
  const userID = req.params.id;
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(userID),
      },
    });

    res.status(200).send("Usuário delete com sucesso");
  } catch (e) {
    res.status(500).send("Erro ao consultar o banco de dados");
  }
});

export { router }