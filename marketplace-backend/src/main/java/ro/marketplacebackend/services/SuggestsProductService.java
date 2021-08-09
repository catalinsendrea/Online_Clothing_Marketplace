package ro.marketplacebackend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.marketplacebackend.entities.Order;
import ro.marketplacebackend.entities.Produse;
import ro.marketplacebackend.repositories.OrderRepository;
import ro.marketplacebackend.repositories.ProduseRepository;

import java.util.*;

@Service
public class SuggestsProductService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SuggestsProductService.class);
    private static OrderRepository orderRepository;
    private static ProduseRepository produseRepository;

    @Autowired
    public SuggestsProductService(OrderRepository orderRepository, ProduseRepository produseRepository) {
        this.orderRepository = orderRepository;
        this.produseRepository = produseRepository;
    }


    //Metoda care returneaza elementul cel mai apropiat ca valoare de tinta dintr-o lista sortata
    public static Integer findClosest(List<Integer> lista, Integer target)
    {
        int n = lista.size();

        //pentru margini
        if(target <= lista.get(0)){
            return lista.get(0);
        }
        if(target >= lista.get(n-1)){
            return lista.get(n-1);
        }

        //facem un binary search
        int i = 0, j = n, mid = 0;
        while(i < j) {
            mid = (i + j) / 2;

            if (lista.get(mid) == target){
                return lista.get(mid);
            }


            //daca targetul este mai mic decat elementul din mijloc vom cauta in stanga
            if (target < lista.get(mid)) {

                //daca targetul este mai mare decat elementul dinaintea elementului din mijloc
                //returnam cel mai mic dintre cele 2
                if (mid > 0 && target > lista.get(mid - 1)){
                    return getClosest(lista.get(mid - 1), lista.get(mid), target);
                }

                //repetam pentru jumatatea ramasa procesul
                j = mid;
            }

            //daca targetul este mai mare decat elementul din mijloc
            else {
                if (mid < n-1 && target < lista.get(mid + 1)){
                    return getClosest(lista.get(mid), lista.get(mid + 1), target);
                }

                i = mid + 1;
            }
        }


        return lista.get(mid);
    }


    // Metoda de a compara care valoare este cea mai apropiată
    // Găsim cel mai apropiat luând diferenț între țintă și ambele valori.
    // Presupunem că val2 este mai mare decât val1 și ținta se află între aceste două.
    public static Integer getClosest(Integer val1, Integer val2, Integer target) {
        if (target - val1 >= val2 - target)
            return val2;
        else
            return val1;
    }


    public static Produse suggestsProduct(){

        //obtinem ultima comanda din baza de date
        Order order = orderRepository.findTopByOrderByIdDesc();


        //transformam String-ul in care sunt salvate id-urile produselor comandate intr-un vector de String-uri
        String[] listaStringIdProduseComandate = order.getId_produse_comandate().split(",");


        //tranformam vectorul de String-uri cu id-uri intr-un vector de intregi
        List<Integer> listaIntegerIdProduseComandate = new ArrayList<>();

        for(int i = 0; i < listaStringIdProduseComandate.length; i++){
            listaIntegerIdProduseComandate.add(Integer.parseInt(listaStringIdProduseComandate[i]));
        }


        //ne scoatem toate produsele din baza de date
        List<Produse> produse = produseRepository.findAll();


        //toate produsele fara cele comandate
        List<Produse> listaProduseFaraCeleComandate = new ArrayList<>();

        int l = 0;
        for(Produse produs : produse){
            if(produs.getId() != listaIntegerIdProduseComandate.get(l)){
                listaProduseFaraCeleComandate.add(produs);
            }
            else if(l < listaIntegerIdProduseComandate.size() - 1){
                l++;
            }
        }


        //in caz ca comanda are mai multe produse alegem unul random dintre ele pentru care vom face sugestia
        Random rand = new Random();
        Integer idProdusAles = listaIntegerIdProduseComandate.get(rand.nextInt(listaIntegerIdProduseComandate.size()));


        //ne scoatem produsul selectat din baza de date
        Optional<Produse> opt = produseRepository.findById(idProdusAles);
        Produse produs = opt.get();
        System.out.println("Numele produsului ales este: " + produs.getTitlu());
        System.out.println("Scorul produsului ales este: " + produs.getScor());



        //salvam scorurile la fiecare produs intr-o lista
        List<Integer> scorProduse = new ArrayList<>();

        for(int i = 0; i < listaProduseFaraCeleComandate.size(); i++){
            scorProduse.add(listaProduseFaraCeleComandate.get(i).getScor());
        }


        //sortam lista cu scorurile produselor
        Collections.sort(scorProduse);


        //scorul cel mai apropiat de scorul nostru este:
        Integer scorSugerat = findClosest(scorProduse, produs.getScor());
        System.out.println("Scorul produsului sugerat este: " + scorSugerat);


        //extragem produsul/produsule cu acest scor din baza de date
        List<Produse> listaProduseSugestie = produseRepository.findByScor(scorSugerat);
        for(int i = 0; i < listaProduseSugestie.size(); i++){

            if(listaProduseSugestie.get(i).getTitlu().equals(produs.getTitlu()) && listaProduseSugestie.get(i).getCuloare().equals(produs.getCuloare())){
                listaProduseSugestie.remove(i);
            }
            System.out.println(listaProduseSugestie.get(i).getTitlu());
        }

        return listaProduseSugestie.get(0);
    }

}
