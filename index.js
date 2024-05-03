function createNode(value=null) {
    let nextNode = null;
    return {
        value,
        nextNode,
    };
}

function createLinkedList() {
    let firstNode = null;
    let lastNode = null;
    let nodeCount = 0;

    const append = (value) => {
        let node = createNode(value);
        if (lastNode === null) {
            firstNode = lastNode = node;
        } else {
            lastNode.nextNode = node;
            lastNode = node;
        }

        ++nodeCount;

        return(lastNode);
    };

    const prepend = (value) => {
        let node = createNode(value);

        node.nextNode = firstNode;
        firstNode = node;

        if (lastNode === null) {
            lastNode = node;
        }

        ++nodeCount;
        return(firstNode);
    };

    const at = (index) => {
        if ((index >= nodeCount) || (index < 0)) {
            throw new Error("index out of range!");
        }

        let result = firstNode;
        while ((--index >= 0) && result) {
            result = result.nextNode;
        }
        return(result);
    };

    const pop = () => {
        let popped = null;
        if (lastNode) {
            popped = lastNode;

            let currentNode = firstNode;
            while (currentNode && (currentNode.nextNode !== lastNode)) {
                currentNode = currentNode.nextNode;
            }

            lastNode = currentNode;

            if (currentNode) {
                lastNode.nextNode = null;
            } else {
                firstNode = null;
            }

            --nodeCount;
        }

        return(popped);
    };

    const contains = (value) => {
        let currentNode = firstNode;
        while (currentNode && (currentNode.value !== value)) {
            currentNode = currentNode.nextNode;
        }

        return(currentNode !== null);
    };

    const find = (value) => {
        let resultIndex = 0;
        
        let currentNode = firstNode;
        while (currentNode && (currentNode.value !== value)) {
            ++resultIndex;
            currentNode = currentNode.nextNode;
        }
        
        if (resultIndex === nodeCount) {
            resultIndex = null;
        }

        return(resultIndex);
    }

    const toString = () => {
        let resultString = "";
        let currentNode = firstNode;
        while (currentNode) {
            resultString += `( ${currentNode.value} ) -> `;
            currentNode = currentNode.nextNode;
        }

        resultString += "null";
        return(resultString);
    }

    const insertAt = (value, index) => {
        // whats the correct behaviour here? >= or >??
        // I feel like >=.
        if ((index >= nodeCount) || (index < 0)) {
            throw new Error("index out of range!");
        }

        let currentNode = firstNode;
        let oneBeforeCurrentNode = null;
        while (index-- > 0) {
            oneBeforeCurrentNode = currentNode;
            currentNode = currentNode.nextNode;
        }
        
        if (oneBeforeCurrentNode === null) {
            oneBeforeCurrentNode = createNode(value);
            oneBeforeCurrentNode.nextNode = currentNode;

            firstNode = oneBeforeCurrentNode;
        } else {
            oneBeforeCurrentNode.nextNode = createNode(value);
            oneBeforeCurrentNode.nextNode.nextNode = currentNode;
        }

        ++nodeCount;
        return(oneBeforeCurrentNode.nextNode);
    };

    const removeAt = (index) => {
        if ((index >= nodeCount) || (index < 0)) {
            throw new Error("index out of range!");
        }

        let currentNode = firstNode;
        let oneBeforeCurrentNode = null;
        while (index-- > 0) {
            oneBeforeCurrentNode = currentNode;
            currentNode = currentNode.nextNode;
        }

        if (oneBeforeCurrentNode === null) {
            firstNode = currentNode.nextNode;
        } else {
            oneBeforeCurrentNode.nextNode = currentNode.nextNode;

            if (lastNode === currentNode) {
                lastNode = oneBeforeCurrentNode;
            }
        }

        --nodeCount;
        return(currentNode);
    };

    return {
        append,
        prepend,
        get size() {
            return nodeCount;
        },
        get head() {
            return firstNode;
        },
        get tail() {
            return lastNode;
        },
        at,
        pop,
        contains,
        find,
        toString,
        insertAt,
        removeAt
    };
}

let ll = createLinkedList();
const node0 = ll.append(4);
const node1 = ll.append(5);
const node2 = ll.append(100);
const node3 = ll.append(["JavaScript is weird", "I agree"]);
console.log("size: ", ll.size);
console.log("head: ", ll.head);
console.log("tail: ", ll.tail);

console.log(ll.toString());
ll.insertAt(140, 0);
console.log(ll.toString());
console.log("removed: ", ll.removeAt(ll.size - 1));
console.log(ll.toString());
ll.prepend("HAHA");
console.log("NANA: ", ll.at(ll.size - 1));

const containsValue = 4;
console.log(`contains ${containsValue}? ${ll.contains(containsValue)}`);

console.log("contains the array thing? ", ll.contains(node3.value));
console.log("index of 100: ", ll.find(100));
console.log(ll.toString());
console.log("size: ", ll.size);
console.log("popped: ", ll.pop());
console.log("size: ", ll.size);
console.log(ll.toString());
console.log("popped: ", ll.pop());
console.log("size: ", ll.size);
console.log(ll.toString());
console.log("popped: ", ll.pop());
console.log("size: ", ll.size);
console.log(ll.toString());
console.log("popped: ", ll.pop());
console.log("size: ", ll.size);
console.log(ll.toString());

console.log(ll.head);
console.log(ll.tail);
console.log("popped: ", ll.pop());
console.log("size: ", ll.size);
console.log(ll.head);
console.log(ll.tail);
