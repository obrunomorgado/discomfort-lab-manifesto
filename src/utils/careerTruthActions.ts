
import { DailyAction } from "@/types/user";

export const generateDailyActions = (): DailyAction[] => {
  const baseActions = [
    {
      id: `action-${Date.now()}-1`,
      description: "Enviar um email importante que você vem adiando",
      points: 25,
      completed: false,
      dueDate: new Date(),
      category: 'professional' as const
    },
    {
      id: `action-${Date.now()}-2`, 
      description: "Falar pelo menos uma vez em uma reunião",
      points: 30,
      completed: false,
      dueDate: new Date(),
      category: 'communication' as const
    },
    {
      id: `action-${Date.now()}-3`,
      description: "Completar uma tarefa sem buscar 'perfeição'",
      points: 35,
      completed: false,
      dueDate: new Date(),
      category: 'behavior' as const
    },
    {
      id: `action-${Date.now()}-4`,
      description: "Documentar um resultado/conquista profissional",
      points: 20,
      completed: false,
      dueDate: new Date(),
      category: 'professional' as const
    },
    {
      id: `action-${Date.now()}-5`,
      description: "Substituir uma desculpa por uma ação concreta",
      points: 40,
      completed: false,
      dueDate: new Date(),
      category: 'mindset' as const
    }
  ];

  return baseActions.slice(0, 3 + Math.floor(Math.random() * 3));
};
