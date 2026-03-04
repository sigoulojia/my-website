#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
};

Node* createNode(int val) {
    Node* n = new Node();
    n->data = val;
    n->left = NULL;
    n->right = NULL;
    return n;
}

Node* insert(Node* root, int val) {
    if (root == NULL)
        return createNode(val);
    if (val < root->data)
        root->left = insert(root->left, val);
    else
        root->right = insert(root->right, val);
    return root;
}

int findmin(Node* root, int i) {
    if (root == NULL)
        return -1;
    while (root->left != NULL)
        root = root->left;
    i++;
    return root->data;
}

Node* findthek(Node* root, int k, int& i) {
    if (root == NULL)
        return NULL;
    
    Node* left = findthek(root->left, k, i);
    if (left != NULL)
        return left;
    
    i++;
    if (i == k)
        return root;
    
    return findthek(root->right, k, i);
}

int main() {
    Node* root = NULL;
    root = insert(root, 30);
    root = insert(root, 23);
    root = insert(root, 25);
    root = insert(root, 10);
    root = insert(root, 13);
    root = insert(root, 15);
    root = insert(root, 2);
    root = insert(root, 1);
    root = insert(root, 6);
    root = insert(root, 70);
    root = insert(root, 2025);
    root = insert(root, 60);
    root = insert(root, 69);
    
    int k;
    int i = 0;
    int y = -1;
    cin >> k;
    Node* res = findthek(root, k, i);
    if (res != NULL)
        cout << "the k is: " << res->data << endl;
    else
        cout << y << endl;
    
    return 0;
}