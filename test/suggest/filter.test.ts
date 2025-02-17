import { NodeType, TypedNode } from '@/analyze/utils';
import { noIndegreeFilter, onlyFunctions } from '@/suggest/filter';

describe('suggest tests', () => {
  it('graph filter noIndegree 1', () => {
    const graph = new Map<TypedNode, Set<TypedNode>>();
    const node1: TypedNode = {
      label: 'node1',
      type: NodeType.var,
    };
    const node2: TypedNode = {
      label: 'node2',
      type: NodeType.fun,
    };
    const node3: TypedNode = {
      label: 'node3',
      type: NodeType.fun,
    };
    const node4: TypedNode = {
      label: 'node4',
      type: NodeType.fun,
    };
    graph.set(node1, new Set([node2]));
    graph.set(node2, new Set([node1, node3]));
    graph.set(node3, new Set([node4]));

    expect(noIndegreeFilter(graph)).toEqual([]);
  });
  it('graph filter noIndegree 2', () => {
    const graph = new Map<TypedNode, Set<TypedNode>>();
    const node1: TypedNode = {
      label: 'node1',
      type: NodeType.var,
    };
    const node2: TypedNode = {
      label: 'node2',
      type: NodeType.fun,
    };
    const node3: TypedNode = {
      label: 'node3',
      type: NodeType.fun,
    };
    const node4: TypedNode = {
      label: 'node4',
      type: NodeType.fun,
    };
    graph.set(node1, new Set([node2]));
    graph.set(node2, new Set([node1]));
    graph.set(node3, new Set([node4]));

    expect(noIndegreeFilter(graph)).toEqual([node3]);
  });
  it('graph filter onlyFunctions 1', () => {
    const graph = new Map<TypedNode, Set<TypedNode>>();
    const node1: TypedNode = {
      label: 'node1',
      type: NodeType.fun,
    };
    const node2: TypedNode = {
      label: 'node2',
      type: NodeType.var,
    };
    const node3: TypedNode = {
      label: 'node3',
      type: NodeType.fun,
    };
    const node4: TypedNode = {
      label: 'node4',
      type: NodeType.fun,
    };
    const node5: TypedNode = {
      label: 'node5',
      type: NodeType.fun,
    };
    graph.set(node1, new Set([node2, node5]));
    graph.set(node2, new Set([node3, node4]));

    expect(onlyFunctions(graph)).toEqual(new Map([
      [node1, new Set([node3, node4, node5])],
    ]));
  });
  it('graph filter onlyFunctions 2', () => {
    const graph = new Map<TypedNode, Set<TypedNode>>();
    const node1: TypedNode = {
      label: 'node1',
      type: NodeType.var,
    };
    const node2: TypedNode = {
      label: 'node2',
      type: NodeType.fun,
    };
    const node3: TypedNode = {
      label: 'node3',
      type: NodeType.fun,
    };
    const node4: TypedNode = {
      label: 'node4',
      type: NodeType.fun,
    };
    const node5: TypedNode = {
      label: 'node5',
      type: NodeType.fun,
    };
    graph.set(node2, new Set([node1, node5]));
    graph.set(node1, new Set([node3, node4]));

    expect(onlyFunctions(graph)).toEqual(new Map([
      [node2, new Set([node3, node4, node5])],
    ]));
  });
});