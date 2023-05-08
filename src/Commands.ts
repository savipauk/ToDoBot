import { Assign } from "./commands/assign";
import { Display } from "./commands/display";
import { Edit } from "./commands/edit";
import { Remove } from "./commands/remove";
import { Taskboard } from "./commands/taskboard";
import { Todo } from "./commands/todo";
import { Command } from "./types/Command";

export const Commands: Command[] = [Todo, Remove, Display, Assign, Edit, Taskboard];