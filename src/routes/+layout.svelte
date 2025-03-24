<script lang="ts">

    import { writable, derived  } from 'svelte/store';
    import { onMount } from 'svelte';
    import '../app.css';
    let { children } = $props();

    // Create a store for menuOpen
    let menuOpen = writable(false);
    let textVisible = writable(true);
    let isSidebarExpanded = writable(true);
    let activeLink = writable('');

    // Derived store to update a local variable
    let isMenuOpen = derived(menuOpen, $menuOpen => $menuOpen);
    let isTextVisible = derived(textVisible, $textVisible => $textVisible);
    let sidebarExpanded = derived(isSidebarExpanded, $isSidebarExpanded => $isSidebarExpanded);

    const toggleMenu = () => {
        // Update the store value instead of directly toggling a boolean
        menuOpen.update(value => !value);
    };

    const toggleTextVisibility = () => {
        textVisible.update(value => !value);
        isSidebarExpanded.update(value => !value);
    };

    const setActiveLink = (link: string) => {
        activeLink.set(link);
    };


    const updateActiveLink = () => {

        const path = window.location.pathname;
        if (path === '/') setActiveLink('home');
        else if (path === '/users') setActiveLink('users');
        else if (path === '/events') setActiveLink('events');
        else if (path === '/sendToAll') setActiveLink('sendToAll');
        else if (path === '/sendEmail') setActiveLink('sendEmail');
    }
</script>

<button
    class="fixed top-4 left-4 z-50 p-3 rounded-full bg-gray-800 text-white shadow-lg sm:hidden transition-transform duration-300 hover:bg-gray-700"
    aria-label="Toggle menu"
    onclick={toggleMenu}
>
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    </svg>
</button>

<aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 h-screen bg-gray-900 text-white shadow-xl transform transition-transform duration-300 flex flex-col"
    class:translate-x-0={$isMenuOpen}
    class:w-72={$sidebarExpanded}
    class:w-16={!$sidebarExpanded}
>
    <div class="h-full flex flex-col p-5">
        <h2 class="text-2xl font-bold mb-6 text-center flex justify-center">
            {#if $isTextVisible}
                Admin Panel
            {/if}
        </h2>
        <ul class="space-y-3 font-medium flex-grow">
            <li class:flex={!$sidebarExpanded} class:justify-center={!$sidebarExpanded}>
                <a href="/" class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition" class:active={$activeLink === 'home'}>
                    🏠 {#if $isTextVisible}Home{/if}
                </a>
            </li>
            <li class:flex={!$sidebarExpanded} class:justify-center={!$sidebarExpanded}>
                <a href="/admin/users" class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition" class:active={$activeLink === 'users'}>
                    👥 {#if $isTextVisible}Users{/if}
                </a>
            </li>
            <li class:flex={!$sidebarExpanded} class:justify-center={!$sidebarExpanded}>
                <a href="/admin/events" class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition" class:active={$activeLink === 'events'}>
                    📅 {#if $isTextVisible}Events{/if}
                </a>
            </li>
            <li class:flex={!$sidebarExpanded} class:justify-center={!$sidebarExpanded}>
                <a href="/admin/sendToAll" class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition" class:active={$activeLink === 'sendToAll'}>
                    📧 {#if $isTextVisible}Email to All{/if}
                </a>
            </li>
            <li class:flex={!$sidebarExpanded} class:justify-center={!$sidebarExpanded}>
                <a href="/admin/sendEmail" class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition" class:active={$activeLink === 'sendEmail'}>
                    ✉️ {#if $isTextVisible}Specific Email{/if}
                </a>
            </li>
            <li class:flex={!$sidebarExpanded} class:justify-center={!$sidebarExpanded}>
                <a href="/generateQR" class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition" class:active={$activeLink === 'sendEmail'}>
                    🏷️ {#if $isTextVisible}Generate QR-Code{/if}
                </a>
            </li>
            <li class:flex={!$sidebarExpanded} class:justify-center={!$sidebarExpanded}>
                <a href="/camera" class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition" class:active={$activeLink === 'sendEmail'}>
                    🏷️ {#if $isTextVisible}Scanner{/if}
                </a>
            </li>
        </ul>
        <button
            class="mt-auto p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex justify-center items-center"
            aria-label="Toggle sidebar"
            onclick={toggleTextVisibility}
        >
            {#if $isTextVisible}
                Close Menu
            {:else}
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 15l-5.878-6.008 1.184-1.192L10 12.694l4.694-4.996 1.184 1.192L10 15z"></path>
                </svg>
            {/if}
        </button>
    </div>
</aside>

<div class="p-4 transition-all duration-300" class:ml-72={$sidebarExpanded} class:ml-16={!$sidebarExpanded}>
    <main class="p-6 bg-white shadow-md rounded-lg">
        {@render children()}
    </main>
</div>

<style>
    /* Add this style to highlight the active link */
    a.active {
        background-color: #4a5568; /* Adjust the color as needed */
    }
</style>

