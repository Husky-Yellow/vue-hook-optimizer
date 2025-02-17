import { TypedNode } from '@/analyze/utils';
import { splitGraph } from './split';
import { noIndegreeFilter, onlyFunctions } from './filter';
import { hasCycle } from './utils';

export enum SuggestionType {
  'info'='info',
  'warning'='warning',
  'error'='error',
}

export type Suggestion = {
  type: SuggestionType
  message: string
}

console;
export function gen(
  graph: {
    nodes: Set<TypedNode>;
    edges: Map<TypedNode, Set<TypedNode>>;
  },
  usedNodes: Set<string>
) {
  const suggestions: Suggestion[] = [];
  const splitedGraph = splitGraph(graph.edges);
  // console.log(splitedGraph);
  splitedGraph.forEach(g => {
    const nodes = Array.from(g.keys());
    if(splitedGraph.length > 1) {
      if (nodes.length > 2 && nodes.some(node => !usedNodes.has(node.label))) {
        suggestions.push({
          type: SuggestionType.info,
          message: `Nodes [${
            nodes.length > 10 
              ? nodes.slice(0, 10).map(node => node.label).join(',') + '...('+nodes.length+')'
              : nodes.map(node => node.label).join(',')
          }] are isolated, perhaps you can refactor them to an isolated file.`,
        });
      }
    }
    if(nodes.length > 1 && nodes.every(node => !usedNodes.has(node.label))) {
      suggestions.push({
        type: SuggestionType.info,
        message: `Nodes [${
          nodes.length > 10 
            ? nodes.slice(0, 10).map(node => node.label).join(',') + '...'
            : nodes.map(node => node.label).join(',')
        }] are not used, perhaps you can remove them.`,
      });
    }
    if(hasCycle(onlyFunctions(g))) {
      suggestions.push({
        type: SuggestionType.error,
        message: `There is a loop call in nodes [${
          nodes.length > 10 
            ? nodes.slice(0, 10).map(node => node.label).join(',') + '...('+nodes.length+')'
            : nodes.map(node => node.label).join(',')
        }], perhaps you can refactor it.`,
      });
    }
  });

  const noIndegreeNodes = noIndegreeFilter(graph.edges);
  noIndegreeNodes.forEach(node => {
    if(!usedNodes.has(node.label)) {
      suggestions.push({
        type: SuggestionType.info,
        message: `Node [${node.label}] is not used, perhaps you can remove it.`,
      });
    }
  });
  
  return suggestions;
}